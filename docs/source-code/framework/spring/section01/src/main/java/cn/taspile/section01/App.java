package cn.taspile.section01;

import cn.taspile.section01.bean.Person;
import cn.taspile.section01.config.BeanConfig;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author cristina
 */
public class App {

    public static void main(String[] args) {
//        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContent.xml");
        ApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);
        Person person = context.getBean(Person.class);
        System.out.println(person);
        String[] beanNames = context.getBeanNamesForType(Person.class);
        for (String beanName : beanNames) {
            System.out.println(beanName);
        }
    }
}
