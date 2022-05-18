# Frontend Clean Architecture

> Read this [in Russian](https://github.com/bespoyasov/frontend-clean-architecture/blob/master/docs/ru.md).

An example app built using the clean architecture.

- [Working app](https://bespoyasov.ru/showcase/frontend-clean-architecture/en/)
- [Huge post about it](https://dev.to/bespoyasov/clean-architecture-on-frontend-4311)

## Things to Consider

There are a few compromises and simplifications in the code that are worth to be mentioned.

### Shared Kernel

Shared Kernel is the code and data on which any modules can depend, but _only if this dependency would not increase coupling_. More details about the limitations and application are well described in the article ["DDD, Hexagonal, Onion, Clean, CQRS, ... How I put it all together"](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/).

In this application, the shared kernel includes global type annotations that can be accessed anywhere in the app and by any module. Such types are collected in [`shared-kernel.d.ts`](https://github.com/bespoyasov/frontend-clean-architecture/blob/master/src/shared-kernel.d.ts).

### Dependency in the Domain

The [`createOrder`](https://github.com/bespoyasov/frontend-clean-architecture/blob/master/src/domain/order.ts#L15) function uses the library-like function `currentDatetime` to specify the order creation date. This is not quite correct, because the domain should not depend on anything.

Ideally, the implementation of the `Order` type should accept all the necessary data, including the date, from outside. The creation of this entity would be in the application layer in `orderProducts`:

```ts
async function orderProducts(user: User, { products }: Cart) {
  const datetime = currentDatetime();
  const order = new Order(user, products, datetime);

  // ...
}
```

### Use Case Testability

The order creation function [`orderProduct`](https://github.com/bespoyasov/frontend-clean-architecture/blob/master/src/application/orderProducts.ts#L24) itself is framework-independent right now and can't be used and tested in isolation from React. The hook wrapper though is only used to provide the use case to components and to inject services into the use case itself.

In a canonical implementation, the function of the use case would be extracted outside the hook, and the services would be passed to the use case via a last argument or a DI:

```ts
type Dependencies = {
  notifier?: NotificationService;
  payment?: PaymentService;
  orderStorage?: OrderStorageService;
};

async function orderProducts(
  user: User,
  cart: Cart,
  dependencies: Dependencies = defaultDependencies
) {
  const { notifier, payment, orderStorage } = dependencies;

  // ...
}
```

Hook would then become an adapter:

```ts
function useOrderProducts() {
  const notifier = useNotifier();
  const payment = usePayment();
  const orderStorage = useOrdersStorage();

  return (user: User, cart: Cart) =>
    orderProducts(user, cart, {
      notifier,
      payment,
      orderStorage,
    });
}
```

In the sources, I thought it was unnecessary, as it would distract from the essence.

### Crooked DI

In the [application layer](https://github.com/bespoyasov/frontend-clean-architecture/blob/master/src/application/orderProducts.ts) we inject services by hand:

```ts
export function useAuthenticate() {
  const storage: UserStorageService = useUserStorage();
  const auth: AuthenticationService = useAuth();

  // ...
}
```

In a good way, this should be automated and done through the dependency injection. But in the case of React and hooks, we can use them as a “container” that returns an implementation of the specified interface.

In this particular application, it didn't make much sense to set up the DI because it would distract from the main topic.
