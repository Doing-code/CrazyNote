package cn.forbearance.spring.bean;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;

/**
 * @author cristina
 */
public class Blue implements InitializingBean, DisposableBean {

    public Blue() {
        System.out.println("blue...构造函数...");
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("blue...destroy()...");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("blue...afterPropertiesSet()...");
    }
}
