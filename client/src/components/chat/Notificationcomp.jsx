import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useEffect, useRef, useState } from "react";

export default function Notificationcomp() {
    //const { unseenmsg } = useSelector((store) => store.notification);
    const [anchorEl, setAnchorEl] = useState(null);
    //const dispatch = useDispatch();
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      //if (unseenmsg.length !== 0) dispatch(removeSeenMsg([]));
    };
  
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
  
    return (
      <div>
        <NotificationsIcon aria-describedby={id} onClick={handleClick} />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {/* {!unseenmsg.length ? (
            <Typography sx={{ p: 2, width: 170 }}>No new messages.</Typography>
          ) : (
            unseenmsg.map((el, index) => (
              <Typography key={index} sx={{ p: 2, width: 170 }}>
                {el.sender.name + " " + el.content.substring(0, 15) + "..."}
              </Typography>
            ))
          )} */}
          <Typography sx={{ p: 2, width: 170 }}>Нет новых сообщений</Typography>
        </Popover>
      </div>
    );
  }