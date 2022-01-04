import { registerEnumType } from 'type-graphql';

enum Order {
    Asc = 'ASC',
    Desc = 'DESC',
}

registerEnumType(Order, {
    name: 'Order',
    description: '',
});

export { Order };