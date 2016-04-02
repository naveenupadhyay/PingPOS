
package com.walmart.pingpos.web.utils;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class ExportToExcelUtils {

	 private static final Logger LOG = LoggerFactory.getLogger(ExportToExcelUtils.class);
	 
	 /**
	  * This method will give you the template of the excel sheet to be uploaded with data.
	  * 
	  * @param <T>
	  * @param httpResponse
	  * @param dtoClass
	  * @param reportName
	  * @throws IOException
	  * @throws ClassNotFoundException
	  */
    @SuppressWarnings({ "rawtypes" })
    public static <T> void downloadTemplate(HttpServletResponse httpResponse, Class dtoClass, String reportName) throws IOException, ClassNotFoundException {

        httpResponse.setContentType("application/vnd.ms-excel");
        httpResponse.setHeader("Content-disposition", "attachment; filename=" + reportName + ".xls");

        Field[] fields = dtoClass.getDeclaredFields();
        HSSFWorkbook doc = new HSSFWorkbook();
        HSSFSheet page = doc.createSheet();
        doc.setSheetName(0, reportName);
        page.createFreezePane((short) 0, (short) 1);
        HSSFCellStyle style = doc.createCellStyle();
        HSSFFont font = doc.createFont();
        // font.setFontHeightInPoints((short) 11);
        font.setColor(HSSFColor.BLACK.index);
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        style.setFont(font);

        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
        style.setWrapText(true);
        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        style.setFillForegroundColor((new HSSFColor.GREY_25_PERCENT()).getIndex());

        HSSFCellStyle style1 = doc.createCellStyle();
        style1.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        style1.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        style1.setBorderRight(HSSFCellStyle.BORDER_THIN);
        style1.setWrapText(true);
        HSSFCellStyle style2 = doc.createCellStyle();
        style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
        style2.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
        style2.setWrapText(true);

        int noOfColoums = fields.length;

        HSSFRow row = page.createRow(0);
        for (int i = 0; i < noOfColoums; i++) {
            HSSFCell cell = row.createCell(i);
            cell.setCellValue(fields[i].getName().toUpperCase());
            cell.setCellStyle(style);
            page.setColumnWidth(i, 5000);
        }

        ServletOutputStream out = httpResponse.getOutputStream();
        doc.write(out);
        out.flush();
        out.close();
    }

    /**
	  * This method exports data to the excel sheet along with header. This is dependent on type of datalist passed.
	  * Headers of the exported list will be given by the name of the fields defined in the <T>
	  * 
	  * @param <T>
	  * @param httpResponse
	  * @param dtoClass
	  * @param reportName
	  * @throws IOException
	  * @throws ClassNotFoundException
	  */
    
    @SuppressWarnings("rawtypes")
	public static <T> void exportDataToExcel(HttpServletResponse httpResponse, Class dtoClass, String reportName, List<T> dataList) throws IOException, ClassNotFoundException {

        httpResponse.setContentType("application/vnd.ms-excel");
        httpResponse.setHeader("Content-disposition", "attachment; filename=" + reportName + ".xls");

        Field[] fields = dtoClass.getDeclaredFields();
        HSSFWorkbook doc = new HSSFWorkbook();
        HSSFSheet page = doc.createSheet();
        doc.setSheetName(0, reportName);
        page.createFreezePane((short) 0, (short) 1);
        HSSFCellStyle style = doc.createCellStyle();
        HSSFFont font = doc.createFont();
        // font.setFontHeightInPoints((short) 11);
        font.setColor(HSSFColor.BLACK.index);
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        style.setFont(font);

        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
        style.setWrapText(true);
        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        style.setFillForegroundColor((new HSSFColor.GREY_25_PERCENT()).getIndex());

        HSSFCellStyle style1 = doc.createCellStyle();
        style1.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        style1.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        style1.setBorderRight(HSSFCellStyle.BORDER_THIN);
        style1.setWrapText(true);
        HSSFCellStyle style2 = doc.createCellStyle();
        style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
        style2.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
        style2.setWrapText(true);

        int noOfColoums = fields.length;

        int rowCount =1;
        HSSFRow row = page.createRow(0);
        for (int i = 0; i < noOfColoums; i++) {
            HSSFCell cell = row.createCell(i);
            cell.setCellValue(fields[i].getName().toUpperCase());
            cell.setCellStyle(style);
            page.setColumnWidth(i, 5000);
        }
        
        for(T data:dataList){
        	   row = page.createRow(rowCount);
        	   rowCount++;
        	   fields = data.getClass().getDeclaredFields();
        	   for (int i = 0; i < noOfColoums; i++) {
                   HSSFCell cell = row.createCell(i);
                   try {
                	   fields[i].setAccessible(true);
					cell.setCellValue(fields[i].get(data)+"");
				} catch (IllegalArgumentException e) {
					LOG.error("exception {} ", e);
				} catch (IllegalAccessException e) {
					LOG.error("exception {} ", e);
				}
                   cell.setCellStyle(style1);
                   page.setColumnWidth(i, 5000);
               }
        }

        ServletOutputStream out = httpResponse.getOutputStream();
        doc.write(out);
        out.flush();
        out.close();
    }

    /**
     * This method exports data to excel. The DataList passed to this method contains data as well as headers.
     * The first element of the list gives you the header of the excel sheet rest elements contains data. 
     * 
     * @param httpResponse
     * @param reportName
     * @param dataList
     * @throws IOException
     */
	public static void exportDataToExcel(HttpServletResponse httpResponse, String reportName, List<String> dataList) throws IOException {

        httpResponse.setContentType("application/vnd.ms-excel");
        httpResponse.setHeader("Content-disposition", "attachment; filename=" + reportName + ".xls");

        HSSFWorkbook doc = new HSSFWorkbook();
        HSSFSheet page = doc.createSheet();
        doc.setSheetName(0, reportName);
        page.createFreezePane((short) 0, (short) 1);
        HSSFCellStyle style = doc.createCellStyle();
        HSSFFont font = doc.createFont();
        // font.setFontHeightInPoints((short) 11);
        font.setColor(HSSFColor.BLACK.index);
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        style.setFont(font);

        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
        style.setWrapText(true);
        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        style.setFillForegroundColor((new HSSFColor.GREY_25_PERCENT()).getIndex());

        HSSFCellStyle style1 = doc.createCellStyle();
        style1.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        style1.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        style1.setBorderRight(HSSFCellStyle.BORDER_THIN);
        style1.setWrapText(true);
        HSSFCellStyle style2 = doc.createCellStyle();
        style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
        style2.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
        style2.setWrapText(true);


        HSSFRow row = page.createRow(0);
           
            String headString = dataList.get(0);
            String [] header = headString.split(",");
            for(int i=0;i<header.length;i++){
            	 HSSFCell cellHEAD = row.createCell(i);
            	cellHEAD.setCellValue(header[i]);
            	cellHEAD.setCellStyle(style);
	            page.setColumnWidth(i, 5000);
            }
        
        for(int i=1;i<dataList.size();i++){
        	   row = page.createRow(i);
        	   String dataString = dataList.get(i);
               String [] data = dataString.split(",");
        	   for (int k = 0; k < data.length; k++) {
                   HSSFCell cell = row.createCell(k);
					cell.setCellValue(data[k]);
                   cell.setCellStyle(style1);
               }
        }

        ServletOutputStream out = httpResponse.getOutputStream();
        doc.write(out);
        out.flush();
        out.close();
    }

}
