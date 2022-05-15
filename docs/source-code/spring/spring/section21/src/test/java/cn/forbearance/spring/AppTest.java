package cn.forbearance.spring;

import cn.forbearance.spring.bean.Color;
import cn.forbearance.spring.config.BeanConfig;
import org.junit.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * @author cristina
 */
public class AppTest {

    @SuppressWarnings("resource")
    @Test
    public void test01() {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);
        System.out.println("容器创建完成");
        Color color = context.getBean(Color.class);
        System.out.println(color);
        context.close();
    }
}
