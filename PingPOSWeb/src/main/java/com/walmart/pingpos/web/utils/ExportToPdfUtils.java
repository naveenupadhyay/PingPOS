
package com.walmart.pingpos.web.utils;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.w3c.dom.Document;
import org.w3c.tidy.Tidy;
import org.xhtmlrenderer.pdf.ITextRenderer;
import org.xml.sax.SAXException;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfAction;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.pdf.PdfWriter;
import com.webapputils.base.cache.CacheManager;
import com.webapputils.base.velocity.Template;
import com.walmart.pingpos.configuration.ConfigUtils;
import com.walmart.pingpos.configuration.Property;
import com.walmart.pingpos.cache.PingPOSTemplateCache;
import com.walmart.pingpos.web.utils.dto.TemplateDTO;

public class ExportToPdfUtils {

    public static void generatePdf(HttpServletResponse httpResponse, TemplateDTO templateDTO, String fileName) throws DocumentException,
            ParserConfigurationException, SAXException, IOException {

        PathResolver pathResolver = new PathResolver();
        String contentPath = pathResolver.resources("");
        templateDTO.addTemplateParam("contentPath", contentPath);
        ByteArrayOutputStream out = getXHTMLFromTemplateDTO(templateDTO);
        httpResponse.setHeader("Content-Type", "application/pdf");
        httpResponse.setHeader("Content-disposition", "inline;filename=" + fileName + ".pdf");
        OutputStream output = httpResponse.getOutputStream();
        byte[] outResponse = addAutoPrintToPDF(XHTMLToPdf(out, contentPath).toByteArray());
        httpResponse.setContentLength(outResponse.length);
        output.write(outResponse);
        output.flush();
        output.close();
    }

    public static ByteArrayOutputStream getXHTMLFromTemplateDTO(TemplateDTO templateDTO) throws IOException {
        Template pdfTemplate = CacheManager.getInstance().getCache(PingPOSTemplateCache.class).getPingPOSTemplateByName(templateDTO.getTemplateName());
        String template = pdfTemplate.evaluate(templateDTO.getTemplateParams());
        return generateXHTML(template);
    }

    /**
     * getStaticPath Converts Html to Xhtml
     * 
     * @param template The template to be parsed
     * @return The output stream of the generated XHtml
     * @throws IOException
     */
    private static ByteArrayOutputStream generateXHTML(String template) throws IOException {
        InputStream in = new ByteArrayInputStream(template.getBytes());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Tidy tidy = new Tidy();
        tidy.setXHTML(true);
        tidy.parseDOM(in, out);
        return out;
    }

    private static ByteArrayOutputStream XHTMLToPdf(ByteArrayOutputStream out, String contentPath) throws ParserConfigurationException, SAXException, IOException,
            DocumentException {
        InputStream in = new ByteArrayInputStream(out.toByteArray());
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        dbf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", Boolean.FALSE);
        dbf.setFeature("http://xml.org/sax/features/validation", Boolean.FALSE);
        DocumentBuilder db = dbf.newDocumentBuilder();
        Document doc = db.parse(in);
        ITextRenderer renderer = new ITextRenderer();
        renderer.setDocument(doc, null);
        renderer.getFontResolver().addFont(getBarcodePath(Property.BARCODE_TYPE), true);
        renderer.layout();
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        renderer.createPDF(new BufferedOutputStream(output));
        return output;
    }

    public static String getBarcodePath(Property barcodeType) {
        StringBuilder barcodePath= new StringBuilder(ConfigUtils.getStringScalar(Property.CONTENT_PATH));
        barcodePath.append("font/").append(ConfigUtils.getStringScalar(barcodeType));
        return barcodePath.toString();
        
    }

    public static byte[] getPDFDataInByte(TemplateDTO templateDTO) throws DocumentException, ParserConfigurationException, SAXException, IOException {
        Template pdfTemplate = CacheManager.getInstance().getCache(PingPOSTemplateCache.class).getPingPOSTemplateByName(templateDTO.getTemplateName());
        PathResolver pathResolver = new PathResolver();
        String contentPath = pathResolver.resources("");
        templateDTO.addTemplateParam("contentPath", contentPath);
        String template = pdfTemplate.evaluate(templateDTO.getTemplateParams());
        ByteArrayOutputStream out = generateXHTML(template);
        return XHTMLToPdf(out, contentPath).toByteArray();
    }

    public static void generateMultiplePdf(HttpServletResponse httpResponse, List<TemplateDTO> pdfTemplateDTOs, String fileName) throws ParserConfigurationException,
            SAXException, IOException, DocumentException {
        Iterator<TemplateDTO> iterator = pdfTemplateDTOs.iterator();
        if (iterator.hasNext()) {
            TemplateDTO pdfTemplateDto = iterator.next();
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            PathResolver pathResolver = new PathResolver();
            String contentPath = pathResolver.resources("");
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            dbf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", Boolean.FALSE);
            dbf.setFeature("http://xml.org/sax/features/validation", Boolean.FALSE);
            DocumentBuilder db = dbf.newDocumentBuilder();
            ITextRenderer renderer = new ITextRenderer();
            InputStream in = new ByteArrayInputStream(getXHTMLFromTemplateDTO(pdfTemplateDto).toByteArray());
            Document doc = db.parse(in);
            renderer.setDocument(doc, null);
            renderer.getFontResolver().addFont(getBarcodePath(Property.BARCODE_TYPE), true);
            renderer.layout();
            renderer.createPDF(output, false);
            while (iterator.hasNext()) {
                TemplateDTO pdfTemplateDTO = iterator.next();
                in = new ByteArrayInputStream(getXHTMLFromTemplateDTO(pdfTemplateDTO).toByteArray());
                renderer.setDocument(db.parse(in), null);
                renderer.layout();
                renderer.writeNextDocument();

            }
            renderer.finishPDF();
            byte[] outResponse = addAutoPrintToPDF(output.toByteArray());
            httpResponse.setHeader("Content-Type", "application/pdf");
            httpResponse.setHeader("Content-disposition", "inline;filename=" + fileName + ".pdf");
            OutputStream outputStream = httpResponse.getOutputStream();
            httpResponse.setContentLength(outResponse.length);
            outputStream.write(outResponse);
            outputStream.flush();
            outputStream.close();
        }
    }

    private static byte[] addAutoPrintToPDF(byte[] pdfDataInByte) throws IOException, DocumentException {
        PdfReader pReader = new PdfReader(pdfDataInByte);
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        PdfStamper pStamper = new PdfStamper(pReader, output);
        //pStamper.addJavaScript("this.print();");
        PdfAction printAction = new PdfAction(PdfAction.PRINTDIALOG);
        pStamper.setPageAction(PdfWriter.PAGE_OPEN, printAction, 1);
        pStamper.close();
        return output.toByteArray();
    }
}
