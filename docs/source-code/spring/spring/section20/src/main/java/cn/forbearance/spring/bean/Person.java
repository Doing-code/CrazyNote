package cn.forbearance.spring.bean;

import org.springframework.beans.factory.annotation.Value;

/**
 * @author cristina
 */
public class Person {

    @Value("${person.name}")
    private String name;

    @Value("#{22}")
    private Integer age;

    public Person() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
