require("assert");
const sinon = require("sinon");
const OntrailModel = require("../src/ontrailmodel.js");
const cs = require("../src/ontrail_addex_contentscript.js");

function assertModelAction(data, expectation) {
  const mock = sinon.mock(OntrailModel);
  expectation(mock);
  cs.Prefiller(mock.object)(data);
  mock.verify();
}

function assertSport(expected, sport) {
  assertModelAction(
    {
      extype: expected,
    },
    mock => {
      mock
        .expects("fillSportSelector")
        .once()
        .withArgs(sport);
    }
  );
}

describe("Sports mapping from Flow nomenclature to Ontrail nomenclature", function() {
  it("Juoksu is mapped to Juoksu", function() {
    assertSport("Juoksu", "Juoksu");
  });

  it("Ratajuoksu is mapped to Juoksu", function() {
    assertSport("Ratajuoksu", "Juoksu");
  });

  it("Nykytanssi is mapped to Tanssi", function() {
    assertSport("Nykytanssi", "Tanssi");
  })
});

describe("Duration mapping", function() {
  it("Should trim the milliseconds from duration", function() {
    assertModelAction(
      {
        duration: "00:40:10.101",
      },
      mock => {
        mock
          .expects("fillDuration")
          .once()
          .withArgs("00:40:10");
      }
    );
  });
});

function assertDistanceFormat(expected, data) {
  assertModelAction(
    {
      distance: data,
    },
    mock => {
      mock
        .expects("fillDistance")
        .once()
        .withArgs(expected);
    }
  );
}

describe("Distance mapping from meters to Ontrails kilometer based format", function() {
  it("Should round 10001 meters down to 10,00 km", function() {
    assertDistanceFormat("10,00 km", "10001");
  });

  it("It should keep 9000 and output 9,00 km", function() {
    assertDistanceFormat("9,00 km", "9000");
  });

  it("Should round meters up so 1006 meters becomes 1,01 km", function() {
    assertDistanceFormat("1,01 km", "1006");
  });

  it("Should round 999 meters to full kilometers", function() {
    assertDistanceFormat("1,00 km", "999");
  });

  it("Should round 499 meters up to 0,50 km", function() {
    assertDistanceFormat("0,50 km", "499");
  });
});

describe("Heart rate mapping from flow.polar.com to Ontrails format", function() {
  it("Heart rate is copied as is", function() {
    assertModelAction(
      {
        avgheartrate: "100",
      },
      model => {
        model
          .expects("fillHeartRate")
          .once()
          .withArgs("100");
      }
    );
  });
});

function assertDate(expected, timestamp) {
  assertModelAction(
    {
      timestamp: timestamp,
    },
    model => {
      model.object.readDate = () => expected;
      model
        .expects("fillDate")
        .once()
        .withArgs(expected);
    }
  );
}

describe("Mapping exercise timestamp to date input on Chrome", function() {
  it("Should present date in Finnish format", function() {
    assertDate("23.4.2012", "2012-04-23T18:25:43.511Z");
  });

  // Javascript date constructor takes moths as 0...11
  it("Should present February as '2' in the months", function() {
    assertDate("11.2.1981", new Date(1981, 1, 11).toJSON());
  });

  it("Should present December as '12' in the months", function() {
    assertDate("11.12.1981", new Date(1981, 11, 11).toJSON());
  });
});
