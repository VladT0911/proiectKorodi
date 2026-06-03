INSERT INTO conveyor (name, status) VALUES ('Conveyor A', 'RUNNING');
INSERT INTO conveyor (name, status) VALUES ('Conveyor B', 'IDLE');


INSERT INTO orders (name, status, product, quantity, created_at, conveyor_id) VALUES ('Order 1', 'PENDING', 'Product A', 100, CURRENT_TIMESTAMP, 1);
INSERT INTO orders (name, status, product, quantity, created_at, conveyor_id) VALUES ('Order 2', 'PROCESSING', 'Product B', 49, CURRENT_TIMESTAMP, 1);
INSERT INTO orders (name, status, product, quantity, created_at, conveyor_id) VALUES ('Order 3', 'COMPLETED', 'Product C', 2, CURRENT_TIMESTAMP, 2);
INSERT INTO orders (name, status, product, quantity, created_at, conveyor_id) VALUES ('Order 4', 'PENDING', 'Product D', 75, CURRENT_TIMESTAMP, 2);
INSERT INTO orders (name, status, product, quantity, created_at, conveyor_id) VALUES ('Order 5', 'CANCELLED', 'Product E', 8, CURRENT_TIMESTAMP, 2);
INSERT INTO orders (name, status, product, quantity, created_at, conveyor_id) VALUES ('Order 6', 'PROCESSING', 'Product F', 30, CURRENT_TIMESTAMP, 1);