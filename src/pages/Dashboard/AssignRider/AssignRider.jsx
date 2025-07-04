import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignedRider = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: parcels = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["unassignedParcels"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcels");
            // Filter: paid & not_collected
            return res.data.filter(
                (p) =>
                    p.payment_status === "paid" &&
                    p.delivery_status === "not_collected"
            );
        },
    });

    if (isLoading) return <p>Loading parcels...</p>;
    if (isError) return <p>Error loading parcels.</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Assign Rider</h2>

            {parcels.length === 0 ? (
                <p className="text-gray-500">No parcels to assign.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full table-zebra">
                        <thead>
                            <tr>
                                <th>Parcel ID</th>
                                <th>Receiver</th>
                                <th>Address</th>
                                <th>Payment Status</th>
                                <th>Delivery Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr key={parcel._id}>
                                    <td>{parcel._id}</td>
                                    <td>{parcel.receiver_name}</td>
                                    <td>{parcel.address}</td>
                                    <td>
                                        <span className="badge badge-success">
                                            {parcel.payment_status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge badge-warning">
                                            {parcel.delivery_status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn text-black btn-sm btn-primary"
                                            // onClick={() => assignRider(parcel)} // placeholder
                                        >
                                            Assign Rider
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AssignedRider;
