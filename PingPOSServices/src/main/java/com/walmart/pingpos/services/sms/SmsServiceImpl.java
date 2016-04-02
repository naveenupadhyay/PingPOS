package com.walmart.pingpos.services.sms;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
 
public class SmsServiceImpl implements ISmsService {
	
	@Override
	public String sendSms(String message,String mobile) {
		try {
			// Construct data
			String user = "username=" + "naveen@truckdepo.in";
			String hash = "&hash=" + "97c0d268182ee3b6cfca8234977f5bcf25a2a373";
			String sender = "&sender=" + "TXTLCL";
			String numbers = "&numbers=91" + mobile;
			
			// Send data
			HttpURLConnection conn = (HttpURLConnection) new URL("http://api.textlocal.in/send/?").openConnection();
			String data = user + hash + numbers + message + sender;
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Length", Integer.toString(data.length()));
			conn.getOutputStream().write(data.getBytes("UTF-8"));
			final BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			final StringBuffer stringBuffer = new StringBuffer();
			String line;
			while ((line = rd.readLine()) != null) {
				stringBuffer.append(line);
			}
			rd.close();
			
			return stringBuffer.toString();
		} catch (Exception e) {
			System.out.println("Error SMS "+e);
			return "Error "+e;
		}
	}
}