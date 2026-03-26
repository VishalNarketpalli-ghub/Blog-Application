# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


```txt

    cdn server
    perfermonce enhanced , why?, How?
    ex : cloudinary
    these provide cloud services -> simple free 

    client is making a post request 
        => Content type is added to the req
        => Required for fetch -> added to teh header
        => HTTP can retreive the data using body parser middlewear like express.json() -> req.body
        => Json cannot transfer the binary data
        => We use form data -> Browser Api -> allows to send text + binary dsta -> multipart (multimedia content)/formdata -> if we use fetch we need to pick this
        => Multer is used to extract the file data -> req.file contains the multer data
        => we dont store the binary data in db -> we use cloud services like cloudinary or aws
        => We need to store the data temp folder -> not a good idea -> performance issues
        => we can stor in memory for temp -> but can lead to memory issues -> solution : limit the size 
        => React can directly communicate with cloudinary (Beta version of cloudinary)

        => Every event handeler function recieves the event implisitly
        => Event is not a function it sends event automatically



```

### Reload handeling
```txt

=> when we reload the page is behaving abnormal

=> when we reload from the user profile it takes us back to login as we went to profile fron login
```