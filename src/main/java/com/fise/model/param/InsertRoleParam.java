package com.fise.model.param;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fise.framework.annotation.NotEmpty;
import com.fise.utils.JsonUtil;


public class InsertRoleParam implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("role_level")
    private Integer roleLevel;
    
    @JsonProperty("role_name")
    private String roleName;

    @JsonProperty("company_id")
    private Integer companyId;

    @JsonProperty("depart_id")
    private Integer departId;
    
    @JsonProperty("creator_id")
    private Integer creatorId;

    private String desc;

    
    public Integer getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Integer creatorId) {
		this.creatorId = creatorId;
	}

	public Integer getDepartId() {
        return departId;
    }

    public void setDepartId(Integer departId) {
        this.departId = departId;
    }

    public Integer getRoleLevel() {
        return roleLevel;
    }

    public void setRoleLevel(Integer roleLevel) {
        this.roleLevel = roleLevel;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
    
    @Override
    public String toString() {
        return JsonUtil.toJson(this);
    }
}
