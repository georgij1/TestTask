import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia
} from '@mui/material';
import {
    getProducts
} from "../../src/api";

export const BodyListProductsAll = () => {
    const [dataStorage, setDataStorage] = React.useState([]);
    const [dataImages, setDataImages] = React.useState([]);
  
    React.useEffect(() => {
      getProducts().then((item: any) => {
        setDataStorage(item);
      }).catch((errorMessage) => {
        console.error(errorMessage);
      });
    }, [])
  
    React.useEffect(() => {
      dataStorage.map((item: any) => {
        console.log(item)
        setDataImages(item["colors"])
      })
    })
  
    React.useEffect(() => {
      dataImages.map((item: any) => {
        console.log(item["images"][0])
      })
    })

    return(
        <Box sx={{
            p: '20px',
            display: 'grid',
            justifyContent: 'space-evenly',
            gap: '20px',
            gridTemplateColumns: '280px auto 40%',
            gridTemplateRows: '30vW 30vw max-content'
          }}>
            {
              dataStorage.map((item: any) => (
                <>
                  {
                    <Card key={item.id} sx={{ 
                      maxWidth: 345,
                      height: 'max-content' 
                    }}
                    onClick={() => {
                      console.log(item)
                      window.open('/details_product', '_self')
                    }}
                    >
                      <CardActionArea sx={{
                        width: '100vh'
                      }}>
                            <Box sx={{
                              height: '100%'
                            }} id="description_product">
                              <CardMedia
                                component="img"
                                height="140"
                                image={item["colors"][0]["images"][0]}
                              />
                            </Box>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                          <>
                            {
                              item["name"]
                            }
                          </>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  }
                </>
              ))
            }
          </Box>
    )
}