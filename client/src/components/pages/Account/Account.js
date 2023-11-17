import React from "react";
import SimpleTemplate from "../../templates/SimpleTemplate";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../organisms";
import { cancelOrder } from "../../../redux/actions/cartActions";

const Account = () => {
  const dispatch = useDispatch();
  const { loggedInUserId } = useSelector((state) => state.authReducer);
  const { orders } = useSelector((state) => state.cartReducer);
  const userOrders = orders?.filter((order) => order.userId === loggedInUserId);

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
    alert(`Canceled Order ${orderId}`);
  };

  return (
    <SimpleTemplate>
      <h2 style={styles.title}>Account History</h2>
      <div style={styles.divider} />
      <h3 style={styles.title}>Your Orders</h3>
      {userOrders?.length ? (
        userOrders?.map((order) => (
          <div key={order.id} style={styles.itemContainer}>
            <p style={{ width: 20 }}>{order.id}</p>
            <p style={{ width: 100 }}>{order.items}</p>
            <p style={{ width: 20 }}>
              {order.deliveryAction || "In Store Pickup"}
            </p>
            <p style={{ width: 200 }}>
              Ordered on {order.orderedDate?.toString()}
            </p>
            <p>Total: {order.total}</p>
            <Button
              buttonName="Cancel"
              buttonStyles={styles.buttonStyle}
              onClick={() => handleCancelOrder(order.id)}
            />
          </div>
        ))
      ) : (
        <p style={{ paddingLeft: 40 }}>No Orders placed yet!</p>
      )}
    </SimpleTemplate>
  );
};

const styles = {
  title: {
    color: "#002B80",
    paddingLeft: 40,
  },
  divider: {
    backgroundColor: "black",
    height: 2,
  },
  buttonStyle: {
    backgroundColor: "#002B80",
    marginBottom: 20,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 20,
    border: "1px solid black",
    borderRadius: 12,
  },
};

export default Account;
