import Portal from "./Portal";
export default function Modal({ open, onClose }) {

    if (!open) return null
    return (
        <>
            <Portal selector="#modal">
                <div>
                    yha pe jo bhi show krna wo layout bnaa sakte ho
                </div>
            </Portal>
        </>
    );
}