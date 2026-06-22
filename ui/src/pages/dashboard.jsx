import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/navbar";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function Dashboard() {

    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalProducts: 0,
        totalInvoices: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        getDashboard();
    }, []);

    const getDashboard = async () => {
        try {
            const { data } = await API.get("/dashboard");
            setStats(data);
        } catch (error) {
            console.log(error);
        }
    };

    const chartData = [
        {
            name: "Customers",
            value:
                stats.totalCustomers || 0
        },
        {
            name: "Products",
            value:
                stats.totalProducts || 0
        },
        {
            name: "Invoices",
            value:
                stats.totalInvoices || 0
        }
    ];

    return (
        <>
            <Navbar />

            <div className="page">
                <h1>Dashboard</h1>

                <div className="stats">

                    <div className="stat-box">
                        <h3>Total Customers</h3>
                        <h2>{stats.totalCustomers}</h2>
                    </div>

                    <div className="stat-box">
                        <h3>Total Products</h3>
                        <h2>{stats.totalProducts}</h2>
                    </div>

                    <div className="stat-box">
                        <h3>Total Invoices</h3>
                        <h2>{stats.totalInvoices}</h2>
                    </div>

                    <div className="stat-box">
                        <h3>Total Revenue</h3>
                        <h2>₹{stats.totalRevenue}</h2>
                    </div>

                </div>

                {/* for chart */}
                <div

                    className="stat-box"
                    style={{
                        marginTop: "20px",
                        height: "300px"
                    }}
                >

                    <h3>
                        Business Overview
                    </h3>

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={chartData}
                        >

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="value"
                                fill="#54c95d"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>
            </div>
        </>
    );
}

export default Dashboard;