# 1Inch-Swap

This project uses 1Inch api to get quote ,approve tokens and swap with your desired tokens on BSC Chain.

### Steps to install and use
- Install all the packages needed
```bash
    npm install
```
- Build and run the code
```bash
    npx parcel index.html
```

### Guide to swap tokens

- Select tokens from the drop down menu.
- Click on **GET QUOTE** to get the best quote for the swap
- If we selected the "FROM" token for the first time, then we have to give permission to the contract to spend those tokens. To do that, after selecting tokens, click on **APPROVE** and sign the transaction.(Only for the first time)
- After approving/already approved, click on **SWAP** to swap tokens.
