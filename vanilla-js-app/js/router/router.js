class Router {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
    this.beforeHooks = [];

    window.addEventListener('popstate', () => this.handleRoute());
    document.addEventListener('DOMContentLoaded', () => this.handleRoute());
  }

  addRoute(path, handler, props = {}) {
    this.routes.push({
      path,
      handler,
      props,
      regex: this.pathToRegex(path),
      params: this.extractParamNames(path)
    });
  }

  pathToRegex(path) {
    return new RegExp('^' + path
      .replace(/\//g, '\\/')
      .replace(/:\w+/g, '([^/]+)')
      .replace(/\*/g, '.*') + '$');
  }

  extractParamNames(path) {
    const matches = path.match(/:(\w+)/g);
    return matches ? matches.map(m => m.substring(1)) : [];
  }

  navigate(path, query = {}) {
    const queryString = Object.keys(query).length > 0
      ? '?' + new URLSearchParams(query).toString()
      : '';

    window.history.pushState(null, null, path + queryString);
    this.handleRoute();
  }

  beforeEach(hook) {
    this.beforeHooks.push(hook);
  }

  async handleRoute() {
    const path = window.location.pathname;
    const query = Object.fromEntries(new URLSearchParams(window.location.search));

    console.log('Router: Handling route:', path);

    for (const hook of this.beforeHooks) {
      const result = await hook(path, query);
      if (result === false) {
        console.log('Router: Navigation prevented by beforeEach hook');
        return;
      }
    }

    for (const route of this.routes) {
      const match = path.match(route.regex);

      if (match) {
        const params = {};
        route.params.forEach((param, index) => {
          params[param] = match[index + 1];
        });

        this.currentRoute = { ...route, params, query };

        console.log('Router: Matched route:', route.path, 'with params:', params);

        const app = document.getElementById('app');
        if (app) {
          app.innerHTML = '';
          await route.handler({ params, query, ...route.props });
        }
        return;
      }
    }

    console.log('Router: No matching route found, redirecting to login');
    this.navigate('/login');
  }

  getParams() {
    return this.currentRoute ? this.currentRoute.params : {};
  }

  getQuery() {
    return this.currentRoute ? this.currentRoute.query : {};
  }
}

export default new Router();