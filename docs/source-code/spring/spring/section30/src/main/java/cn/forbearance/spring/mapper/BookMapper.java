package cn.forbearance.spring.mapper;

import org.springframework.stereotype.Repository;

/**
 * @author cristina
 */
@Repository
public class BookMapper {

    private String label = "1";

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    @Override
    public String toString() {
        return "BookMapper{" +
                "label='" + label + '\'' +
                '}';
    }
}
