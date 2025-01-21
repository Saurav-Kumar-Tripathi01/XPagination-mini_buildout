import React, { useState, useEffect } from 'react';

const Xpagination = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);

    const itemsPerPage = 10;

    useEffect(() => {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            .then((response) => response.json())
            .then((data) => setEmployees(data))
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            });
    }, []);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(employees.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#f9f9f9',
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
            <table
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    borderCollapse: 'collapse',
                    marginBottom: '20px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                <thead>
                    <tr
                        style={{
                            backgroundColor: '#008C72',
                            color: 'white',
                        }}
                    >
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((employee) => (
                        <tr
                            key={employee.id}
                            style={{
                                backgroundColor: employee.id % 2 === 0 ? '#f2f2f2' : 'white',
                                textAlign: 'left',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0f7fa')}
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = employee.id % 2 === 0 ? '#f2f2f2' : 'white')
                            }
                        >
                            <td style={tdStyle}>{employee.id}</td>
                            <td style={tdStyle}>{employee.name}</td>
                            <td style={tdStyle}>{employee.email}</td>
                            <td style={tdStyle}>{employee.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={{
                        ...buttonStyle,
                        backgroundColor: currentPage === 1 ? '#cccccc' : '#008C72',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    }}
                >
                    Previous
                </button>
                <span
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        backgroundColor: '#008C72',
                        color: 'white',
                        borderRadius: '4px',
                    }}
                >
                    {currentPage}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(employees.length / itemsPerPage)}
                    style={{
                        ...buttonStyle,
                        backgroundColor:
                            currentPage === Math.ceil(employees.length / itemsPerPage)
                                ? '#cccccc'
                                : '#008C72',
                        cursor:
                            currentPage === Math.ceil(employees.length / itemsPerPage)
                                ? 'not-allowed'
                                : 'pointer',
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const thStyle = {
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
};

const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    color: 'white',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
};

export default Xpagination;
