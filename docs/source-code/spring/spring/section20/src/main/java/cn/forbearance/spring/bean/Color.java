package cn.forbearance.spring.bean;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author cristina
 */
public class Color {

    private Blue blue;

    public Color() {
    }

    public Color(Blue blue) {
        this.blue = blue;
    }

    public Blue getBlue() {
        return blue;
    }

    @Autowired
    public void setBlue(Blue blue) {
        this.blue = blue;
    }

    @Override
    public String toString() {
        return "Color{" +
                "blue=" + blue +
                '}';
    }
}
