import { useRouteError } from "react-router";
function ErrorBoundary() {
    let { data, status, statusText } = useRouteError();
    console.log(useRouteError());

    return (
        <div className="text-center text-red-600">
            <h1 className="">
                {status} - {statusText}
            </h1>
            <h1>{data}</h1>
        </div>
    );
}

export default ErrorBoundary;
