// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";


contract Token is ERC20 {
    address internal owner;
    mapping(address => uint256) public tokenPrices;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        owner = msg.sender;
        tokenPrices[address(this)] = 50000000000000;
    }

    function mint(address account, uint256 amount) public onlyOwner {
        require(amount > 0, "Amount must be greater than 0");

        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(account) >= amount, "Insufficient balance");

        _burn(account, amount);
    }

    function getTotalSupply() external view returns (uint256) {
        return totalSupply();
    }

    function approve(address _owner, address spender, uint256 value) public {
        _approve(_owner, spender, value);
    }
}

contract Marketplace {
    // seller address to token address mapping
    mapping(address => address) public sellerTokenAddresses;

    //ab
    mapping(string => bool) public isTwitterRegistered;

    // Define the Token struct
    struct TokenData {
        string tokenName;
        string tokenSymbol;
        uint256 tokenPrice;
        address sellerAddress;
        address tokenAddress;
    }
    // Array to store all tokens
    TokenData[] public tokens;

    struct Listing {
        address seller;
        address tokenAddress;
        uint256 tokenAmount;
        uint256 pricePerToken;
        bool sold;
    }
    Listing[] public listings;

    function getListings() public view returns (Listing[] memory) {
        // Check if there are any listings
        return listings;
    }

    // Pricing parameters
    uint256 public constant SCALING_FACTOR = 16000;
    uint256 public constant MAX_REWARD = 0.005 ether; // Set a maximum reward limit

    // Mapping to store accumulated rewards for each seller
    mapping(address => uint256) public sellerRewards;

    event PurchaseLog(
        address buyer,
        address seller,
        uint256 tokenAmount,
        uint256 buyingPrice
    );

    event RegisterToken(
        string tokenName,
        string tokenSymbol,
        address tokenAddress,
        address ownerAddress
    );

      event SellLog(
            address seller,
            address buyer,
            uint256 tokenAmount,
            uint256 sellingPrice
        );

    //function to register user and instantiate token
    function registerToken(
        string memory _name,
        string memory _symbol,
        string memory _email
    ) public payable {
        // require(msg.value >= 1 ether, "Insufficient registration fee");
        require(
            sellerTokenAddresses[msg.sender] == address(0)  && !isTwitterRegistered[_email],
            "Already registered"
        );

        Token token = new Token(_name, _symbol);

        sellerTokenAddresses[msg.sender] = address(token);

        // Add the token to the tokens array
        TokenData memory newtoken = TokenData({
            tokenName: _name,
            tokenSymbol: _symbol,
            // tokenInitialPrice: 50000000000000,
            tokenPrice: token.tokenPrices(address(token)),
            sellerAddress: address(msg.sender),
            tokenAddress: address(token)
        });
        tokens.push(newtoken);

        isTwitterRegistered[_email] = true;

        emit RegisterToken(
            _name,
            _symbol,
            address(token),
            address(msg.sender)
        );
    }


    // Function for a buyer to purchase a token
    function purchaseToken(
        address _sellerAddress,
        uint256 _tokenAmount
    ) public payable {
        address sellerTokenAddress = sellerTokenAddresses[_sellerAddress];
        require(
            sellerTokenAddress != address(0),
            "Seller does not have a registered token"
        );

        Token sellerToken = Token(sellerTokenAddress);

        // Calculate the buying price of ETH based on the total outstanding supply
        uint256 totalSupply = sellerToken.getTotalSupply(); // Retrieve total supply using the new function

        if (totalSupply > 0) {
            uint256 buyingPrice = (totalSupply * totalSupply * 1e18) /
                (SCALING_FACTOR);
            uint256 sellingPrice = ((totalSupply - 1) *
                (totalSupply - 1) *
                1e18) / (SCALING_FACTOR);


            // // Calculate the reward for the seller based on the difference between the buying price and the initial price of the token
            uint256 reward = buyingPrice - sellingPrice;

            // Implement minimum reward mechanism
            if (reward > MAX_REWARD) {
                reward = MAX_REWARD;
            }

            // Update seller's accumulated rewards
            sellerRewards[_sellerAddress] += reward;

            // Mint tokens to the buyer
            Token(sellerTokenAddress).mint(msg.sender, _tokenAmount);

            // Transfer ETH to the contract
            require(
                msg.value >= (buyingPrice * _tokenAmount) / 1e18,
                "Incorrect price per token"
            );

            emit PurchaseLog(
                msg.sender,
                _sellerAddress,
                _tokenAmount,
                buyingPrice
            );
        } else {
            // Mint tokens to the buyer
            Token(sellerTokenAddress).mint(msg.sender, _tokenAmount);

            // Convert token price to Wei
            uint256 buyingPrice = sellerToken.tokenPrices(
                sellerTokenAddress
            ) * 1 wei;

            // Transfer ETH to the contract
            require(
                msg.value >= buyingPrice * _tokenAmount,
                "insufficient Eth given to contract"
            );


            // updateOrAddTokenInfo(_sellerAddress);

              emit PurchaseLog(
                msg.sender,
                _sellerAddress,
                _tokenAmount,
                buyingPrice
            );
        }
    }

    // Function for a buyer to sell seller's tokens for ETH
    function sellToken(
        // address _sellerAddress,
        address _tokenAddress,
        uint256 _tokenAmount
    ) public payable {
        // address sellerTokenAddress = sellerTokenAddresses[_sellerAddress];
        Token sellerToken = Token(_tokenAddress);
        uint256 totalSupply = sellerToken.getTotalSupply();
        // uint256 sellingPrice = ((totalSupply - 1)**2) / SCALING_FACTOR;
        uint256 sellingPrice = ((totalSupply - 1) * (totalSupply - 1) * 1e18) /
            (SCALING_FACTOR);

        // uint256 buyerBalance = userTokenBalances[msg.sender][sellerTokenAddress];

        require(
            _tokenAddress != address(0),
            "seller doesn't have registered token"
        );
        require(
            sellerToken.balanceOf(msg.sender) >= _tokenAmount,
            "Buyer does not have enough tokens"
        );

        require(_tokenAmount > 0, "token amount shouldn't be zero");

        // Burn tokens from the buyer
        Token(_tokenAddress).burn(msg.sender, _tokenAmount);

        //transfer eth to buyer
        // require(
        //     msg.value >= (sellingPrice * _tokenAmount) / 1e18,
        //     "Insufficient ETH to purchase token"
        // );
        payable(msg.sender).transfer((sellingPrice * _tokenAmount) / 1e18);

        emit SellLog(
            msg.sender,
            _tokenAddress,
            _tokenAmount,
            sellingPrice
        );
    }

    function listTokenForSale(
        // address sellerAddress,
        address tokenAddress,
        uint256 tokenAmount,
        uint256 _pricePerToken
    ) public {
        // address sellerTokenAddress = sellerTokenAddresses[sellerAddress];
        Token sellerToken = Token(tokenAddress);
        // Check if the buyer owns the token
        require(
            sellerToken.balanceOf(msg.sender) >= tokenAmount,
            "Insufficient token amount"
        );

        // Add the token to the list of tokens for sale
        listings.push(
            Listing({
                seller: msg.sender,
                tokenAddress: tokenAddress,
                tokenAmount: tokenAmount,
                pricePerToken: _pricePerToken * 1 wei,
                sold: false
            })
        );

        sellerToken.approve(msg.sender, address(this), tokenAmount);
        sellerToken.transferFrom(msg.sender, address(this), tokenAmount);
    }

    function removeListingAndRefund(uint256 listingId) public {
        require(listings.length > listingId, "Listing does not exist");

        require(!listings[listingId].sold, "Listing is already sold");

        require(
            listings[listingId].seller == msg.sender,
            "Only the listing owner can remove it"
        );

        // Get the token address
        address tokenAddress = listings[listingId].tokenAddress;

        // Get the token amount
        uint256 tokenAmount = listings[listingId].tokenAmount;

        // Mark the listing as removed
        listings[listingId].sold = true;

        // Transfer the token back to the buyer
        Token(tokenAddress).transfer(msg.sender, tokenAmount);
    }

    function buyResellTokens(
        uint256 listingId,
        uint256 tokenAmount
    ) public payable {
        // Check if the listing exists
        require(listings.length > listingId, "Listing does not exist");

        // Check if the listing is still available
        require(!listings[listingId].sold, "Listing is already sold");

        // Check if the buyer has enough ETH to purchase the token
        require(
            msg.value >=
                listings[listingId].pricePerToken * tokenAmount * 1 wei,
            "Insufficient money to purchase token"
        );

        // Transfer token from contract to the buyer
        Token(listings[listingId].tokenAddress).transfer(
            msg.sender,
            tokenAmount
        );

        // Mark the listing as sold
        listings[listingId].sold = true;

    }

    // Function for a seller to redeem their accumulated rewards
    //@todo- add token amount to reddem , celebrity can redeem in diff accont also
    function redeemRewards(address newReceiver, uint256 amount) public {
        require(
            sellerRewards[msg.sender] >= amount,
            "Insufficient rewards to redeem"
        );

        // Transfer the specified amount of rewards to the specified or default receiver
        address receiver = (newReceiver == address(0))
            ? msg.sender
            : newReceiver;
        payable(receiver).transfer(amount);

        // Subtract the redeemed amount from the seller's accumulated rewards
        sellerRewards[msg.sender] -= amount * 1 wei;
    }

    function getAllTokens() public view returns (TokenData[] memory) {
        return tokens;
    }
}