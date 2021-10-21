import styles from "./styles.module.scss";

export function ToastMessageStatus() {
  return (
    <div className={styles.toastMessageStatusWrapper}>
      <span>Mensagem enviada com sucesso!</span>
    </div>
  );
}
