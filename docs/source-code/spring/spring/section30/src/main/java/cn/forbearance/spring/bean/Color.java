package cn.forbearance.spring.bean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author cristina
 */
//@Component
public class Color {

    private Blue blue;

    public Color() {
    }

    //    @Autowired
    public Color(/*@Autowired*/ Blue blue) {
        this.blue = blue;
        System.out.println("color...construct");
    }

    public Blue getBlue() {
        return blue;
    }

//    @Autowired
    public void setBlue(/*@Autowired*/ Blue blue) {
        this.blue = blue;
    }

    @Override
    public String toString() {
        return "Color{" +
                "blue=" + blue +
                '}';
    }
}
