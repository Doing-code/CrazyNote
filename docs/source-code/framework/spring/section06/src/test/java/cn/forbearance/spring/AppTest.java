package cn.forbearance.spring;

import cn.forbearance.spring.bean.Book;
import cn.forbearance.spring.config.BeanConfig;
import org.junit.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.Arrays;
import java.util.Map;

/**
 * @author cristina
 */
public class AppTest {

    @SuppressWarnings("resource")
    @Test
    public void test01() {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);
        String[] beanNames = context.getBeanNamesForType(Book.class);
        for (String beanName : beanNames) {
            System.out.println(beanName);
        }
        System.out.println("*****************************");
        Map<String, Book> beanTypes = context.getBeansOfType(Book.class);
        System.out.println(beanTypes);
    }
}
