package cn.forbearance.spring;

import cn.forbearance.spring.config.BeanConfig;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import javax.sql.DataSource;
import java.util.Collections;
import java.util.SortedMap;
import java.util.TreeMap;

/**
 * @author cristina
 */
public class App {

    public static void main(String[] args) {
        final SortedMap<Integer, String> map = new TreeMap<>();
        map.put(0, "0");
        map.put(1, "2");
        map.put(2, "3");
        map.put(3, "4");
        SortedMap<Integer, String> map1 = Collections.unmodifiableSortedMap(map);
        System.out.println(map1);
//        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(BeanConfig.class);
//        String[] beanNames = context.getBeanNamesForType(DataSource.class);
//        for (String beaName : beanNames) {
//            System.out.println(beaName);
//        }
//        context.close();
    }
}
