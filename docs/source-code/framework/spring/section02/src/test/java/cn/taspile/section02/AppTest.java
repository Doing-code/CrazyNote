package cn.taspile.section02;

import cn.taspile.section02.config.BeanConfig;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author cristina
 */
public class AppTest {

    @SuppressWarnings("resource")
    @Test
    public void test01() {
//        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContent.xml");
        ApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);
        // 获取 Spring 容器中定义的所有 JavaBean 的名称
        String[] beanNames = context.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            System.out.println(beanName);
        }
    }
}
