import { Oval } from 'react-loader-spinner';

function Loading() {
    return (
        <>
            <Oval
                visible={true}
                height="120"
                width="120"
                color="#16abf8"
                secondaryColor="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </>
    )
}

export default Loading
