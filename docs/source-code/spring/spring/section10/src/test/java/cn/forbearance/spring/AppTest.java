package cn.forbearance.spring;

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
        String[] beanNames = context.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            System.out.println(beanName);
        }
        System.out.println("**********************");
        Object bean1 = context.getBean("customFactoryBean");
        System.out.println("bean的类型: " + bean1.getClass());
        System.out.println("**********************");
        Object bean2 = context.getBean("&customFactoryBean");
        System.out.println("bean的类型: " + bean2.getClass());
    }
}
