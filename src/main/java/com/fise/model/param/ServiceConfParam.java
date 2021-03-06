package com.fise.model.param;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fise.utils.JsonUtil;

public class ServiceConfParam {
	@JsonProperty("config_id")
    private Integer configid;
	
	@JsonProperty("service_name")
    private String serviceName;
	
	@JsonProperty("service_pwd")
    private String servicePwd;
	
	@JsonProperty("auth_code")
    private String authcode;

	public Integer getConfigid() {
		return configid;
	}

	public void setConfigid(Integer configid) {
		this.configid = configid;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getServicePwd() {
		return servicePwd;
	}

	public void setServicePwd(String servicePwd) {
		this.servicePwd = servicePwd;
	}

	public String getAuthcode() {
		return authcode;
	}

	public void setAuthcode(String authcode) {
		this.authcode = authcode;
	}

    @Override
    public String toString() {
        return JsonUtil.toJson(this);
    }
	
	
}
