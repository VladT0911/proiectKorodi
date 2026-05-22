package Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @GetMapping("/orders")
    public List<Map<String, Object>> getOrders() {
        return Arrays.asList(
            Map.of("id", 1, "name", "Order 1", "status", "Pending", "product", "Product A", "quantity", 3),
            Map.of("id", 2, "name", "Order 2", "status", "Pending", "product", "Product B", "quantity", 5),
            Map.of("id", 3, "name", "Order 3", "status", "Pending", "product", "Product C", "quantity", 2)

        );
    }
}
