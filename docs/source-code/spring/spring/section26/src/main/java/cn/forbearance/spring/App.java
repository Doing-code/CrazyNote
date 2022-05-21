package cn.forbearance.spring;

import cn.forbearance.spring.config.BeanConfig;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import javax.sql.DataSource;

/**
 * @author cristina
 */
public class App {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);
        String[] beanNames = context.getBeanNamesForType(DataSource.class);
        for (String beaName : beanNames) {
            System.out.println(beaName);
        }
        context.close();
    }
}
