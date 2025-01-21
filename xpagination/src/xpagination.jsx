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
                alert('Failed to fetch data');
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
        <div style={styles.container}>
            {error && <p style={styles.error}>{error}</p>}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.headerRow}>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((employee) => (
                        <tr
                            key={employee.id}
                            style={employee.id % 2 === 0 ? styles.rowEven : styles.rowOdd}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0f7fa')}
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = employee.id % 2 === 0 ? '#f2f2f2' : 'white')
                            }
                        >
                            <td style={styles.td}>{employee.id}</td>
                            <td style={styles.td}>{employee.name}</td>
                            <td style={styles.td}>{employee.email}</td>
                            <td style={styles.td}>{employee.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={styles.pagination}>
                <button
                    onClick={handlePreviousPage}
                    style={{
                        ...styles.button,
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    }}
                    aria-label="Previous page"
                >
                    Previous
                </button>
                <span style={styles.pageIndicator}>
                    {currentPage}
                </span>
                <button
                    onClick={handleNextPage}
                    style={{
                        ...styles.button,
                        cursor: currentPage === Math.ceil(employees.length / itemsPerPage) ? 'not-allowed' : 'pointer',
                    }}
                    aria-label="Next page"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        boxSizing: 'border-box',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
    table: {
        width: '100%',
        maxWidth: '800px',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    headerRow: {
        backgroundColor: '#008C72',
        color: 'white',
    },
    th: {
        padding: '12px',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
        textAlign: 'left',
    },
    rowEven: {
        backgroundColor: '#f2f2f2',
        textAlign: 'left',
        cursor: 'pointer',
    },
    rowOdd: {
        backgroundColor: 'white',
        textAlign: 'left',
        cursor: 'pointer',
    },
    pagination: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        color: 'white',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
        backgroundColor: '#008C72',
    },
    pageIndicator: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#008C72',
        color: 'white',
        borderRadius: '4px',
    }
};

export default Xpagination;
