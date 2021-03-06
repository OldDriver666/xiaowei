package com.fise.dao;

import com.fise.model.entity.WiAdmin;
import com.fise.model.entity.WiAdminExample;
import com.fise.model.param.AdminUpdate;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface WiAdminMapper {
    long countByExample(WiAdminExample example);

    int deleteByExample(WiAdminExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(WiAdmin record);

    int insertSelective(WiAdmin record);

    List<WiAdmin> selectByExample(WiAdminExample example);

    WiAdmin selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") WiAdmin record, @Param("example") WiAdminExample example);

    int updateByExample(@Param("record") WiAdmin record, @Param("example") WiAdminExample example);

    int updateByPrimaryKeySelective(WiAdmin record);

    int updateByPrimaryKey(WiAdmin record);
    
    int updateById(WiAdmin param); 
    
    int deleteById(AdminUpdate param);
}