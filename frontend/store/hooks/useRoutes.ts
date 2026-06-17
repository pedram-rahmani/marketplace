export default function useRoutes(routes) {
    let allRoutes = routes.map((item) => item);
    let routesChildren = routes
        .map(
            (item) =>
                item.children &&
                item.children.map((child) => ({
                    parentId: item.path,
                    ...child,
                }))
        )
        .flat()
        .filter((child) => child !== undefined);
    allRoutes = allRoutes.concat(routesChildren);

    return [allRoutes];
}
