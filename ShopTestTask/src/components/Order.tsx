import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { Box } from "@mui/material";
import Button from '@mui/joy/Button';

export const Order = () => {
    return (
        <Box sx={{
            padding: '10px'
        }}>
            <Button endDecorator={<KeyboardArrowLeft />} sx={{
                marginBottom: '10px'
            }} onClick={() => {
                window.open('/details_product', '_self')
            }}></Button>
            {
                localStorage.getItem('order') ? Array.from(JSON.parse(localStorage.getItem('order'))["names"]).map((item: any) => {
                    return <div>{item}</div>
                }) : null
            }
            {
                localStorage.getItem('order') ? Array.from(JSON.parse(localStorage.getItem('order'))["sizes"]).map((item: any) => {
                    return <div>{item}</div>
                }) : null
            }
            {
                localStorage.getItem('order') ? Array.from(JSON.parse(localStorage.getItem('order'))["colors"]).map((item: any) => {
                    return <div>{item}</div>
                }) : null
            }
            <Button>Заказать</Button>
            <Button onClick={() => {
                localStorage.removeItem('order')
                window.location.reload()
            }}>Удалить все товары</Button>
        </Box>
    );
}