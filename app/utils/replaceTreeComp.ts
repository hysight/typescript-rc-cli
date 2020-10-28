export function replaceTreeComp(tree: Array<any>, compConfig) {
    return tree.map((v) => {
        if(typeof v.component === 'string' && compConfig[v.component]) {

            const Comp = compConfig[v.component];
            return Object.assign({...v}, {
                component: Comp
            });

        }
        if(v.routes && v.routes.length) {
            return Object.assign({...v}, {
                routes: replaceTreeComp(v.routes, compConfig)
            });
        }
        return v;
    });
}

export function replaceTreeChildKey(tree) {
    return tree.map(({children, ...rest}) => {
        if(children) {
            return Object.assign({...rest}, {
                routes: replaceTreeChildKey(children)
            });
        }
        return rest;
    })
}