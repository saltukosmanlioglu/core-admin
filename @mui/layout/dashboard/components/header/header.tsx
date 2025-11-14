import * as React from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import NavbarBreadcrumbs from "../navbar-breadcrumbs";
import MenuButton from "../menu-button";
import { HeaderProps } from "./types";

export default function Header({ buttons, breadcrumbItems }: HeaderProps) {
  const [dropdownValues, setDropdownValues] = React.useState<Record<number, string>>({});
  const [openMap, setOpenMap] = React.useState<Record<number, boolean>>({});

  const handleDropdownChange = (idx: number) => (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setDropdownValues((prev) => ({ ...prev, [idx]: value }));

    const btn = buttons?.[idx];
    const match =
      btn && btn.type === "dropdown"
        ? btn.dropdownList.find((d) => d.text === value)
        : undefined;
    match?.onClick?.();
  };

  return (
    <Stack direction="row" sx={{ display: { xs: "none", md: "flex" }, width: "100%", alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", maxWidth: { sm: "100%", md: "1700px" }, pt: 1.5 }} spacing={2}>
      <NavbarBreadcrumbs breadcrumbItems={breadcrumbItems} />

      <Stack direction="row" sx={{ gap: 1 }}>
        {buttons?.map((b, i) =>
          b.type === "dropdown" ? (
            <FormControl key={i} size="small" sx={{ minWidth: 140 }}>
              <Select
                value={dropdownValues[i] ?? ""}
                onChange={handleDropdownChange(i)}
                displayEmpty
                open={Boolean(openMap[i])}
                onOpen={() => setOpenMap((m) => ({ ...m, [i]: true }))}
                onClose={() => { setOpenMap((m) => ({ ...m, [i]: false })); }}
                inputProps={{ "aria-label": b.text ?? "selector" }}
                renderValue={(val) => (val === "" ? b.text ?? "Select" : (val as string))}
                IconComponent={(iconProps: any) => {
                  const hasValue = (dropdownValues[i] ?? "") !== "";
                  if (!hasValue) return <KeyboardArrowDownRoundedIcon {...iconProps} />;

                  return (
                    <CloseRoundedIcon
                      {...iconProps}
                      onClick={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDropdownValues((prev) => ({ ...prev, [i]: "" }));
                        b.onClose?.();
                      }}
                      sx={{ cursor: "pointer" }}
                      fontSize="small"
                    />
                  );
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      mt: 1,
                      borderRadius: 2,
                      bgcolor: "#ffffff",
                      color: "#0f172a",
                      boxShadow: "0 12px 32px rgba(15,23,42,0.12)",
                      border: "1px solid rgba(148,163,184,0.20)",
                    },
                  },
                }}
                sx={{
                  color: "#0f172a",
                  bgcolor: "#ffffff",
                  borderRadius: 2,
                  fontSize: 14,
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(148,163,184,0.5)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(148,163,184,0.8)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 0 0 2px rgba(164,108,194,0.28)", // soft purple glow
                    backgroundColor: "#ffffff",
                    transition: "all 0.22s ease",
                  },
                  "& .MuiSelect-icon": {
                    pointerEvents: "auto",
                    zIndex: 1,
                    color: "#94a3b8",
                  },
                }}
              >
                {b.dropdownList.map((opt, k) => (
                  <MenuItem key={k} value={opt.text} sx={{ fontSize: 14, py: 1.0 }}>
                    {opt.icon && <span style={{ marginRight: 8 }}>{opt.icon}</span>}
                    {opt.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <MenuButton key={i} onClick={b.onClick ?? (() => { })}>
              {b.icon ?? b.text ?? <NotificationsRoundedIcon />}
            </MenuButton>
          )
        )}
      </Stack>
    </Stack>
  );
}
