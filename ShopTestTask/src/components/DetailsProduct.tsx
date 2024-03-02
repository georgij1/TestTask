import React from "react"
import { getProduct } from "../api";
import { Badge, Box, CardMedia, Tooltip } from "@mui/material";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { VariantProp } from '@mui/joy/styles';
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";

export const DetailsProduct = () => {
    const [dataStorage, setDataStorage] = React.useState([]);
    const [dataColors, setDataColors] = React.useState([]);
    const [dataImages, setDataImages] = React.useState([]);
    const [dataColorObject, setDataColorObject] = React.useState([]);
    const [loadedData, setLoadedData] = React.useState<boolean>(false);

    React.useEffect(() => {
        getProduct(localStorage.getItem('data')).then((item: any) => {
          setDataStorage(item)
          setDataColors(item["colors"])
          setLoadedData(true)
        }).catch((errorMessage) => {
          console.error(errorMessage);
        });
    }, [])

    const [srcImageChooseColor, setSrcImageChooseColor] = React.useState('');
    const [sizeProduct, setSizeProduct] = React.useState<number>(1);

    React.useEffect(() => {
        console.log(dataStorage)
    })

    const [variant, setVariant] = React.useState<VariantProp>('');

    return (
        <div style={{padding: '10px'}}>
            <Button endDecorator={<KeyboardArrowLeft />} sx={{
                marginBottom: '10px'
            }} onClick={() => {
                localStorage.removeItem('data')
                localStorage.removeItem('order')
                window.open('/', '_self')
            }}></Button>
            <Tooltip onClick={() => window.open('/order', '_self')} title="Корзина">
                <Badge 
                    badgeContent={localStorage.getItem('order') ? Array.from(JSON.parse(localStorage.getItem('order'))["names"]).length : 0} color="primary"
                >
                    <ShoppingBasket/>
                </Badge>
            </Tooltip>
            {
                loadedData ? <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px'
                }}>
                    <Card sx={{ width: '100%' }}>
                        <div>
                            <Typography level="title-lg">{dataStorage["name"]}</Typography>
                            <Typography level="body-sm">Товар № {dataStorage["id"]}</Typography>
                        </div>
                        <AspectRatio style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            {
                                srcImageChooseColor ? <img
                                    src={srcImageChooseColor}
                                    loading="lazy"
                                    alt=""
                                    style={{
                                        width: '43%',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                />: <img
                                        src={dataColors[0]["images"][0]}
                                        loading="lazy"
                                        alt=""
                                        style={{
                                            width: '43%',
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    />
                            }
                            
                        </AspectRatio>
                        <div>
                            <Typography level="body-xs">Цена:</Typography>
                            <Typography fontSize="lg" fontWeight="lg">
                                {dataColors[0]["price"]} руб.
                            </Typography>
                        </div>
                        <div>
                            <Typography level="body-xs">Выбранный размер:</Typography>
                            <Typography fontSize="lg" fontWeight="lg">
                                {
                                        Array.from(dataColors[0]["sizes"]).length > 0 ?
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: '10px'
                                            }}>
                                                {
                                                    sizeProduct == 0 ? 
                                                        <Button disabled>Разобрали</Button> 
                                                    : 
                                                        <Button>{sizeProduct}</Button>
                                                }
                                            </Box>
                                    : <Button disabled>Разобрали</Button>
                                }
                            </Typography>
                        </div>
                        <Box sx={{
                            'display': 'flex',
                            'gap': '10px',
                        }}>
                            {
                                dataImages.length > 0 ? <>
                                    {
                                        dataImages.map((item: any) => (
                                            <img key={item.id} style={{
                                                'width': '10%',
                                                'height': '10%',
                                                padding: '10px',
                                                border: '2px solid blue',
                                                borderRadius: '10px'
                                            }} src={item} alt="" onClick={() => {
                                                setSrcImageChooseColor(item)
                                                console.log(srcImageChooseColor)
                                            }}/>
                                        ))
                                    }
                                </> : <>
                                    {
                                        <>
                                            <img style={{
                                                'width': '10%',
                                                'height': '10%',
                                                padding: '10px',
                                                border: '2px solid blue',
                                                borderRadius: '10px'
                                                }} src={dataColors[0]["images"][0]} alt="" onClick={() => {
                                                    setSrcImageChooseColor(dataColors[0]["images"][0])
                                                }}
                                            />
                                            <img style={{
                                                'width': '10%',
                                                'height': '10%',
                                                padding: '10px',
                                                border: '2px solid blue',
                                                borderRadius: '10px'
                                                }} src={dataColors[0]["images"][1]} alt="" onClick={() => {
                                                    setSrcImageChooseColor(dataColors[0]["images"][1])
                                                }}
                                            />
                                        </>
                                    }
                                </>
                            }
                        </Box>
                            {
                                variant === "solid" ? <>
                                    <Button size="md" variant={variant} color="success">
                                        Товар успешно добавлен в корзину
                                    </Button>
                                </> : <>
                                    <Button
                                        variant="solid"
                                        size="md"
                                        color="primary"
                                        aria-label="Explore Bahamas Islands"
                                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                                        onClick={() => {
                                            let names:any[] = []
                                            let colors:any[] = []
                                            let sizes:any[] = []
                                            let body = {
                                                "names": names,
                                                "colors": colors,
                                                "sizes": sizes
                                            }
                                            console.log('to order')
                                            console.log(dataStorage["name"])
                                            names.push(dataStorage["name"])
                                            if (dataImages.length === 0) {
                                                console.log(dataColors[0]["name"])
                                                colors.push(dataColors[0]["name"])
                                            }
                                            else {
                                                console.log(dataColorObject)
                                                colors.push(dataColorObject)
                                            }
                                            console.log(sizeProduct)
                                            sizes.push(sizeProduct)
                                            setVariant('solid')
                                            console.log(body)
                                            localStorage.setItem('order', JSON.stringify(body))
                                        }}
                                    >
                                        В корзину
                                    </Button>
                                </>
                            }
                        <CardContent orientation="horizontal">
                            {
                                dataColors.map((item: any) => (
                                    <Box onClick={(event: any) => {
                                        setDataImages([])
                                        if (event.currentTarget.textContent == "Разобрали") {
                                            alert('Разобрали')
                                        }

                                        else {
                                            setSrcImageChooseColor(event.currentTarget.querySelector('.MuiCardMedia-img').src)
                                            for (let img of event.currentTarget.querySelectorAll('img')) {
                                                setDataImages(prevArr => [...prevArr, img.src])
                                            }
                                            setDataColorObject(item["name"])
                                        }
                                    }} key={item.id} sx={{
                                        background: '#f0f4f8',
                                        padding: '15px',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        boxShadow: '0 0 10px black'
                                    }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={item["images"][0]}
                                        />
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={item["images"][1]}
                                        />
                                        {
                                            Array.from(item["sizes"]).length > 0 ?
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    gap: '10px'
                                                }}>
                                                    {Array.from(item["sizes"]).map((item: any) => (
                                                        <Button onClick={(event: any) => {
                                                            console.log(event.currentTarget.textContent)
                                                            setSizeProduct(event.currentTarget.textContent)
                                                        }} key={item.id}>
                                                            {item}
                                                        </Button>
                                                    ))}
                                                </Box>
                                            : <Button disabled>Разобрали</Button>
                                        }
                                    </Box>
                                ))
                            }
                        </CardContent>
                    </Card>
                </Box> : <></>
            }
        </div>
    );
}