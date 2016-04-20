package com.walmart.pingpos.model.response;

import java.io.Serializable;

public class Items implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2248305657058002471L;
	
	
	String productId;
	String img_url;
	String product_url;
	String name;
	Double price;
	Double  linePrice;
	Integer quantity;
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getImg_url() {
		return img_url;
	}
	public void setImg_url(String img_url) {
		this.img_url = img_url;
	}
	public String getProduct_url() {
		return product_url;
	}
	public void setProduct_url(String product_url) {
		this.product_url = product_url;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Double getLinePrice() {
		return linePrice;
	}
	public void setLinePrice(Double linePrice) {
		this.linePrice = linePrice;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	
}
