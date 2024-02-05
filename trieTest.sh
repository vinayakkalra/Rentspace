dfx start --clean --background
dfx deploy backend
hotelCanister=$(dfx canister call backend createNewHotelCanister hotelCanister | grep -oP '(?<=\")(.*?)(?=\")')
dfx canister call $hotelCanister createHotel '(record {hotelTitle= "venture";hotelDes="Huge rooms";hotelImage="fvfvfvv";hotelPrice="$2000";hotelLocation="Lucknow"})'
dfx canister call $hotelCanister createHotel '(record {hotelTitle= "ventage";hotelDes="Huge rooms";hotelImage="fvffvfvv";hotelPrice="$2000";hotelLocation="Lahore"})'
dfx canister call $hotelCanister createHotel '(record {hotelTitle= "venusvvffvbfvvfvfvfvfdvffvfff";hotelDes="Huge rooms";hotelImage="vfv";hotelPrice="$2998";hotelLocation="Ludhiana"})'
