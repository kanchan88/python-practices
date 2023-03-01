from minio import Minio
from minio.error import S3Error
import requests
import io

def main():
    # Create a client with the MinIO server playground, its access key
    # and secret key.
    client = Minio(
        "localhost:9000",
        access_key="admin",
        secret_key="password",
        secure=False
    )

    # Make 'asiatrip' bucket if not exist.
    found = client.bucket_exists("web_data")
    if not found:
        client.make_bucket("web_data")
    else:
        print("Bucket 'web_data' already exists")

    url = "https://api.scrapingrobot.com/"

    querystring = {"token":"00906d7c-0e72-40a3-9185-3bc9675ce5c0"}

    payload = {
        "url": "https://www.yourkoseli.com/",
        "module": "HtmlRequestScraper",
        "params": {
            "postBody": "my_custom_payload",
            "contentType": "text/plain"
        }
    }
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    response = requests.request("POST", url, json=payload, headers=headers, params=querystring)

    value = response.text
    value_as_bytes = value.encode('utf-8')
    value_as_a_stream = io.BytesIO(value_as_bytes)

    client.put_object(
        "web_data", "scarped_data", data=value_as_a_stream
    )
    print(
        "File is successfully uploaded as successfully"
    )


if __name__ == "__main__":
    try:
        main()
    except S3Error as exc:
        print("error occurred.", exc)
