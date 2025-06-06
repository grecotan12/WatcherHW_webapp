export const Spinner = () => {
    return (
        <div className="container d-flex justify-content-center mt-5 mb-5">
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}