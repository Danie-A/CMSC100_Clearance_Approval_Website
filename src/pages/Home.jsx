export default function Home() {

  const renderHomeContent = (status) => {
    if (status === 'Pending') {
      return (
        <>
          <p>You have a pending clearance application.</p>
          <button type="button" class="btn btn-primary">Open Clearance Application</button>
        </>
      );
    } else {
      return (
        <>
          <p>You have no pending clearance application.</p>
          <button type="button" class="btn btn-primary">Create Clearance Application</button>
        </>
      );
    }
  };

  return (
    <>
      <div className="whole-container">
        {renderHomeContent('Pending')}
      </div>
    </>
  );
}