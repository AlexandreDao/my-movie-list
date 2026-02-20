import { useTheme } from "@/hooks";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { FC } from "react";

type DateTimeSpinnerProps = {
  isVisible?: boolean;
  value: Date;
  onChange?: (value: Date) => void;
  onDismiss?: () => void;
};

const DateTimeSpinner: FC<DateTimeSpinnerProps> = ({
  isVisible,
  value,
  onChange,
  onDismiss,
}) => {
  const { colorScheme, colors } = useTheme();

  return isVisible ? (
    <DateTimePicker
      value={value}
      positiveButton={{ label: "CONFIRM", textColor: colors.textPrimary }}
      negativeButton={{ label: "CANCEL", textColor: colors.textPrimary }}
      themeVariant={colorScheme}
      onChange={(event, date) => {
        onDismiss?.();
        if (event.type !== "dismissed") {
          onChange?.(date!);
        }
      }}
      mode="date"
      display="spinner"
    />
  ) : null;
};

export default DateTimeSpinner;
