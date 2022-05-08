package cn.forbearance.spring.bean;

import org.springframework.beans.factory.FactoryBean;

/**
 * @author cristina
 */
public class CustomFactoryBean implements FactoryBean<Red> {

    /**
     * 返回Red对象，这个对象会被添加到容器中
     * @return
     * @throws Exception
     */
    @Override
    public Red getObject() throws Exception {
        System.out.println("CustomFactoryBean...getObject()...");
        return new Red();
    }

    /**
     * 获取FactoryBean管理的对象的类型
     * @return
     */
    @Override
    public Class<?> getObjectType() {
        return Red.class;
    }

    /**
     * true：单实例
     * false：多实例
     * @return
     */
    @Override
    public boolean isSingleton() {
        return true;
    }
}
