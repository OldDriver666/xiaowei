package com.fise.controller.adminstrator;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fise.base.ErrorCode;
import com.fise.base.HttpContext;
import com.fise.base.Response;
import com.fise.framework.annotation.IgnoreAuth;
import com.fise.model.param.AdminInsert;
import com.fise.model.param.AdminQuery;
import com.fise.model.param.AdminUpdate;
import com.fise.model.param.LoginParam;
import com.fise.model.param.LogoutParam;
import com.fise.server.administrator.IAdministratorService;
import com.fise.server.auth.IAuthService;

@RestController
@RequestMapping("/boss/admin")
public class AdminstratorController {

    private Logger logger = Logger.getLogger(this.getClass());

    @Resource
    private IAdministratorService adminSvr;

    @Resource
    IAuthService authService;

    @IgnoreAuth
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Response adminLogin(@RequestBody @Valid LoginParam param) {
        Response resp = new Response();
        try {
            logger.info(param.toString());
            resp = adminSvr.login(param);
        } catch (Exception e) {
            e.printStackTrace();
            resp.failure(ErrorCode.ERROR_SYSTEM);
        }
        return resp;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public Response logout(@RequestBody @Valid LogoutParam param, HttpServletRequest request) {
        Response resp = new Response();
        logger.info(param.toString());
        resp = adminSvr.logout(param, request);

        return resp;
    }

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public Response adminInsert(@RequestBody @Valid AdminInsert param) {
        Response resp = new Response();

        if (!authService.inserAuth()) {
            return resp.failure(ErrorCode.ERROR_REQUEST_AUTH_FAILED);
        }
        param.setCreatorId(HttpContext.getMemberId());
        if (null == param.getCompanyId() || 0 == param.getCompanyId()) {
        	param.setCompanyId(HttpContext.getCompanyId());
		}
        resp = adminSvr.insertAdmin(param);
        logger.info("新增管理员:"+param.toString());
        return resp;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public Response adminUpdate(@RequestBody @Valid AdminUpdate param) {
        Response resp = new Response();

        if (!authService.updateAuth()) {
            return resp.failure(ErrorCode.ERROR_REQUEST_AUTH_FAILED);
        }
        param.setCreatorId(HttpContext.getMemberId());
        logger.info(param.toString());
        resp = adminSvr.updateAdmin(param);
        return resp;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public Response adminDelete(@RequestBody @Valid AdminUpdate param) {
        Response resp = new Response();

        if (!authService.updateAuth()) {
            return resp.failure(ErrorCode.ERROR_REQUEST_AUTH_FAILED);
        }
        param.setCreatorId(HttpContext.getMemberId());
        logger.info(param.toString());
        resp = adminSvr.deleteAdmin(param);
        return resp;
    }
    
    @RequestMapping(value = "/query", method = RequestMethod.POST)
    public Response adminQuery(@RequestBody @Valid AdminQuery param) {
        Response resp = new Response();
        param.setCreatorId(HttpContext.getMemberId());
        logger.info(param.toString());
        resp = adminSvr.queryAdmin(param);
        return resp;
    }
    
    @RequestMapping(value = "/queryself", method = RequestMethod.POST)
    public Response adminQuerySelf() {
        Response resp = new Response();
//        param.setCreatorId(HttpContext.getMemberId());
//        logger.info(param.toString());
        resp = adminSvr.queryAdminSelf();
        return resp;
    }

    @IgnoreAuth
    @RequestMapping(value = "/islogin", method = RequestMethod.POST)
    public Response isLogin(@RequestBody @Valid Map<String, String> map) {
        Response resp = new Response();
        logger.info(map.toString());
        resp = adminSvr.isLogin(map.get("accessToken"));
        return resp;
    }
}
