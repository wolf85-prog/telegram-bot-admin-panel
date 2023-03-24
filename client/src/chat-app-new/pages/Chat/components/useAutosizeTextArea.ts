import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      
        // Нам нужно на мгновение сбросить высоту, чтобы получить правильное значение scrollHeight для текстовой области.
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight - 40;

      // Затем мы устанавливаем высоту напрямую, вне цикла рендеринга.
      // Попытка установить это с помощью состояния или ссылки приведет к неправильному значению.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;