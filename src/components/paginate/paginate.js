import { Button } from "@mui/material";

export function paginate(
    arr,
  
  
    isFetching,
  
    pageSize,
    setPageSize,
  
  ) {
    return <div className="center">
      <Button
  
        variant="contained"
        style={{
          margin: "10px",
        }}
        isLoading={isFetching}
        onClick={() => {
     
          setPageSize(pageSize - 1);
        } }
      >
  
        Previous
      </Button>
      {arr.map((data, index) => (
        <>
  
          <Button
            key={index}
            variant={data == pageSize - 1 ? "contained" : "outlined"}
  
            style={{
              margin: "10px",
            }}
            isLoading={isFetching}
  
          >
            {index + 1}
          </Button>
        </>
      ))}
      <Button
  
        variant="contained"
        style={{
          margin: "10px",
        }}
        isLoading={isFetching}
        onClick={() => {
  
          setPageSize(
            pageSize >
                arr.length - 1
                ? pageSize
                : pageSize + 1
                
          );
        } }
      >
        Next
      </Button>
    </div>;
  }