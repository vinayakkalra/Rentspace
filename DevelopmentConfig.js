//Decides if canister ids used are of production or development
const production=false

export const host=(production)?"https://icp-api.io":"http://127.0.0.1:4943"

export const ids={
    userCan:(production)?
        "tassb-3qaaa-aaaan-qloxq-cai":
        "by6od-j4aaa-aaaaa-qaadq-cai",
    hotelCan:(production)?
        "r5p4j-iyaaa-aaaan-qloya-cai":
        "avqkn-guaaa-aaaaa-qaaea-cai",
    backendCan:(production)?
        "thtuv-wiaaa-aaaan-qloxa-cai":
        "bkyz2-fmaaa-aaaaa-qaaaq-cai",
    reviewCan:(production)?
        "rtnrb-tiaaa-aaaan-qloza-cai":
        "dfdal-2uaaa-aaaaa-qaama-cai",
    bookingCan:(production)?
        "r2o25-faaaa-aaaan-qloyq-cai":
        "a4tbr-q4aaa-aaaaa-qaafq-cai",
    tokenCan:(production)?
        "ryjl3-tyaaa-aaaaa-aaaba-cai"
        :"ryjl3-tyaaa-aaaaa-aaaba-cai",
}

